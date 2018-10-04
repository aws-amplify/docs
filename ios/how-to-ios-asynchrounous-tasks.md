# iOS: Working with Asynchronous Tasks

To work with asynchronous operations without blocking the UI thread, the SDK provides the following options:

    - ``completionHandler``, a streamlined class which offers a simple, common pattern for most API calls.

    - ``AWSTask``, a class that is a renamed version of BFTask from the Bolts framework. AWSTasks provides advantages for more complex operations like chaining asynchronous requests. For complete documentation on Bolts, see the
      [Bolts-ObjC repo](https://github.com/BoltsFramework/Bolts-ObjC).

## Using completionHandler

Most simple asynchronous API method calls can use ``completionHandler`` to handle
method callbacks. When an asynchronous method is complete, ``completionHandler`` returns two parts: a response
object containing the method's return if the call was successful, or ``nil`` if failed; and an error object containing the ``NSError`` state when a call fails, or ``nil`` upon success.

### Handling Asynchronous Method Returns with completionHandler

The following code shows typical usage of ``completionHandler`` using Amazon Kinesis Firehose as the example.

```swift
var firehose = AWSFirehose.default()
firehose.putRecord(AWSFirehosePutRecordInput(), completionHandler: {(_ response: AWSFirehosePutRecordOutput?, _ error: Error?) -> Void in
    if error != nil {
        //handle error
    }
    else {
        //handle response
    }
})
```

## Using AWSTask

An ``AWSTask`` object represents the result of an asynchronous method. Using ``AWSTask``,
you can wait for an asynchronous method to return a value, and then do something with that
returned value. You can chain asynchronous requests instead of nesting them. This
helps keep logic clean and code readable.

### Handling Asynchronous Method Returns with AWSTask

The following code shows how to use ``continueOnSuccessBlockWith:`` and ``continueWith:`` to handle methods calls
that return an ``AWSTask`` object.

```swift
let kinesisRecorder = AWSKinesisRecorder.default()

let testData = "test-data".data(using: .utf8)
kinesisRecorder?.saveRecord(testData, streamName: "test-stream-name").continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    // Guaranteed to happen after saveRecord has executed and completed successfully.
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    return nil
})
```

The ``submitAllRecords`` call is made within the ``continueOnSuccessWith`` /
``continueWithSuccessBlock:`` because we want to run ``submitAllRecords`` after
``saveRecord:streamName:`` successfully finishes running. The ``continueWith``
and ``continueOnSuccessWith`` won't run until the previous asynchronous call finishes.
In this example, ``submitAllRecords`` is guaranteed to see the result of ``saveRecord:streamName:``.

### Handling Errors with AWSTask

The ``continueWith:``   and ``continueOnSuccessWith:`` block calls work in similar ways. Both ensure
that the previous asynchronous method finishes executing before the subsequent block runs. However, they
have one important difference: ``continueOnSuccessWith:`` is skipped if an error occurred in the previous operation, but ``continueWith:`` is always executed.

For example, consider the following scenarios, which refer to the preceding code snippet above.

* ``saveRecord:streamName:`` succeeded and ``submitAllRecords`` succeeded.

  In this scenario, the program flow  proceeds as follows:

    1. ``saveRecord:streamName:`` is successfully executed.
    2. ``continueOnSuccessWith:`` is executed.
    3. ``submitAllRecords`` is successfully executed.
    4. ``continueWith:`` is executed.
    5. Because ``task.error`` is nil, it doesn't log an error.
    6. Done.

* ``saveRecord:streamName:`` succeeded and ``submitAllRecords`` failed.

  In this scenario, the program flow  proceeds as follows:

    1. ``saveRecord:streamName:`` is successfully executed.
    2. ``continueOnSuccessWith`` is executed.
    3. ``submitAllRecords`` is executed with an error.
    4. ``continueWithBlock:`` is executed.
    5. Because ``task.error`` is NOT nil, it logs an error from ``submitAllRecords``.
    6. Done.

* ``saveRecord:streamName:`` failed.

  In this scenario, the program flow  proceeds as follows:

    1. ``saveRecord:streamName:`` is executed with an error.
    2. ``continueOnSuccessWith:`` is skipped and will NOT be executed.
    3. ``continueWithBlock:`` is executed.
    4. Because ``task.error`` is NOT nil, it logs an error from ``saveRecord:streamName:``.
    5. Done.


#### Consolidated Error Logic with AWSTask

The preceding example consolidates error handling logic at the end of the execution chain for both methods called. It doesn't check for ``task.error`` in ``continueOnSuccessBlockWith:``, but waits until the ``continueWith:`` block executes to do so. An error from either the ``submitAllRecords`` or the ``saveRecord:streamName:`` method will be printed.

#### Per Method Error Logic with AWSTask

The following code shows how to implement the same behavior, but makes error handling specific to each method. ``submitAllRecords`` is only called if ``saveRecord:streamName`` succeeds, however, in this case, the ``saveRecord:streamName`` call uses ``continueWith:``, the block logic checks ``task.error`` and returns nil upon error. If that block succeeds then ``submitAllRecords`` is called using  ``continueWith:`` in a block that also checks ``task.error`` for its own context.

```swift
let kinesisRecorder = AWSKinesisRecorder.default()

let testData = "test-data".data(using: .utf8)
kinesisRecorder?.saveRecord(testData, streamName: "test-stream-name").continueWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    if let error = task.error as? NSError {
        print("Error from 'saveRecord:streamName:': \(error)")
        return nil
    }
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        print("Error from 'submitAllRecords': \(error)")
        return nil
    }

    return nil
})
```

### Returning AWSTask or nil

Remember to return either an ``AWSTask`` object or ``nil`` in every usage of ``continueWith:`` and ``continueOnSuccessWith:``. In most cases, Xcode provides a warning if there is no valid return present, but in some cases an undefined error can occur.

### Executing Multiple Tasks with AWSTask

If you want to execute a large number of operations, you have two options: executing in sequence or executing in parallel.

#### In Sequence

You can  submit 100 records to an Amazon Kinesis stream in sequence as follows:

```swift
var task = AWSTask<AnyObject>(result: nil)

for i in 0...100 {
    task = task.continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
        return kinesisRecorder!.saveRecord(String(format: "TestString-%02d", i).data(using: .utf8), streamName: "YourStreamName")
    })
}

task.continueOnSuccessWith { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}
```

In this case, the key is to concatenate a series of tasks by reassigning ``task``.

```swift
task.continueOnSuccessWith { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
```

#### In Parallel

You can execute multiple methods in parallel by using ``taskForCompletionOfAllTasks:`` as follows.

```swift
var tasks = Array<AWSTask<AnyObject>>()
for i in 0...100 {
    tasks.append(kinesisRecorder!.saveRecord(String(format: "TestString-%02d", i).data(using: .utf8), streamName: "YourStreamName")!)
}

AWSTask(forCompletionOfAllTasks: tasks).continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    return nil
})
```

In this example you create an instance of ``NSMutableArray``, put all of our tasks in it, and then pass it to ``taskForCompletionOfAllTasks:``, which is successful only when all of the tasks are successfully executed. This approach may be faster, but it may consume more system resources. Also, some AWS services, such as Amazon DynamoDB, throttle a large number of certain requests. Choose a sequential or parallel approach based on your use case.

### Executing a Block on the Main Thread with AWSTask

By default, ``continueWithBlock:`` and ``continueWithSuccessBlock:`` are executed on a background thread. But in some cases (for example, updating a UI component based on the result of a service call), you need to execute an operation on the main thread. To execute an operation on the main thread, you can use Grand Central Dispatch or ``AWSExecutor``.

#### Grand Central Dispatch

The following example shows the use of ``dispatch_async(dispatch_get_main_queue(), ^{...});`` to execute a block on the main thread. For error handling, it creates a ``UIAlertView`` on the main thread when record submission fails.

```swift
let kinesisRecorder = AWSKinesisRecorder.default()

let testData = "test-data".data(using: .utf8)
kinesisRecorder?.saveRecord(testData, streamName: "test-stream-name").continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        DispatchQueue.main.async(execute: {
            let alertController = UIAlertView(title: "Error!", message: error.description, delegate: nil, cancelButtonTitle: "OK")
            alertController.show()
        })
        return nil
    }

    return nil
})
```

#### AWSExecutor

Another option is to use ``AWSExecutor`` as follows.

```swift
let kinesisRecorder = AWSKinesisRecorder.default()

let testData = "test-data".data(using: .utf8)
kinesisRecorder?.saveRecord(testData, streamName: "test-stream-name").continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}).continueWith(executor: AWSExecutor.mainThread(), block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        let alertController = UIAlertView(title: "Error!", message: error.description, delegate: nil, cancelButtonTitle: "OK")
        alertController.show()
        return nil
    }

    return nil
})
```

In this case, ``block:`` (Swift) is executed on the main thread.
