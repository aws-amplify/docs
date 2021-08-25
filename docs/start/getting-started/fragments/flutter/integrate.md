In this section you’ll integrate Amplify DataStore with your app, and learn to use the generated data model to create, update, query, and delete Todo items by building an app. You can find the source code of the final Todo App [on our GitHub repository](https://github.com/cshfang/amplify-flutter-datastore-starter/tree/main/amplified_todo).

First, replace the contents of your *main.dart* file with the following UI boilerplate code. Typically, you would break this file up into smaller modules but we've kept it as a single file here just for the tutorial. You might find your IDE complains about numerous unreferenced declarations but, don’t worry, we’ll get around to fixing those as we fill out our app with more functionality.

```dart
// dart async library we will refer to when setting up real time updates
import 'dart:async';
// flutter and ui libraries
import 'package:flutter/material.dart';
// amplify packages we will need to use
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
// amplify configuration and models that should have been generated for you
import 'amplifyconfiguration.dart';
import 'models/ModelProvider.dart';
import 'models/Todo.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Amplified Todo',
      home: TodosPage(),
    );
  }
}

class TodosPage extends StatefulWidget {
  @override
  _TodosPageState createState() => _TodosPageState();
}

class _TodosPageState extends State<TodosPage> {
  @override
  void initState() {
    // to be filled in a later step
    super.initState();
  }

  @override
  void dispose() {
    // to be filled in a later step
    super.dispose();
  }

  Future<void> _initializeApp() async {
    // to be filled in a later step
  }

  Future<void> _configureAmplify() async {
    // to be filled in a later step
  }

  Future<void> _fetchTodos() async {
    // to be filled in a later step
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Todo List'),
      ),
      body: Center(child: CircularProgressIndicator()),
      // body: _isLoading
      //     ? Center(child: CircularProgressIndicator())
      //     : TodosList(todos: _todos),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddTodoForm()),
          );
        },
        tooltip: 'Add Todo',
        label: Row(
          children: [Icon(Icons.add), Text('Add todo')],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

class TodosList extends StatelessWidget {
  final List<Todo> todos;

  TodosList({required this.todos});

  @override
  Widget build(BuildContext context) {
    return todos.length >= 1
        ? ListView(
            padding: EdgeInsets.all(8),
            children: todos.map((todo) => TodoItem(todo: todo)).toList())
        : Center(child: Text('Tap button below to add a todo!'));
  }
}

class TodoItem extends StatelessWidget {
  final double iconSize = 24.0;
  final Todo todo;

  TodoItem({required this.todo});

  void _deleteTodo(BuildContext context) async {
    // to be filled in a later step
  }

  Future<void> _toggleIsComplete() async {
    // to be filled in a later step
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () {
          _toggleIsComplete();
        },
        onLongPress: () {
          _deleteTodo(context);
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(todo.name,
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  Text(todo.description ?? 'No description'),
                ],
              ),
            ),
            Icon(
                todo.isComplete
                    ? Icons.check_box
                    : Icons.check_box_outline_blank,
                size: iconSize),
          ]),
        ),
      ),
    );
  }
}

class AddTodoForm extends StatefulWidget {
  @override
  _AddTodoFormState createState() => _AddTodoFormState();
}

class _AddTodoFormState extends State<AddTodoForm> {
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();

  Future<void> _saveTodo() async {
    // to be filled in a later step
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Todo'),
      ),
      body: Container(
        padding: EdgeInsets.all(8.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                  controller: _nameController,
                  decoration: InputDecoration(filled: true, labelText: 'Name')),
              TextFormField(
                  controller: _descriptionController,
                  decoration:
                      InputDecoration(filled: true, labelText: 'Description')),
              ElevatedButton(onPressed: _saveTodo, child: Text('Save'))
            ],
          ),
        ),
      ),
    );
  }
}
```

Go ahead and run your code now and you should see an app with a progress indicator and a floating action button but not much else. 

```bash
flutter run
```

Let’s next configure Amplify and give the app a reason to have a loading state at all.

## Configure Amplify

To the top of the `_TodosPageState` class, add the following.

```dart
class _TodosPageState extends State<TodosPage> {

  // loading ui state - initially set to a loading state
  bool _isLoading = true;

  // list of Todos - initially empty
  List<Todo> _todos = [];

  // amplify plugins
  final AmplifyDataStore _dataStorePlugin =
      AmplifyDataStore(modelProvider: ModelProvider.instance);
```

Update the `initState()` function in the `_TodosPageState` class.

```dart
@override
void initState() {

  // kick off app initialization
  _initializeApp();

  super.initState();
}
```

Update the `_initializeApp()` function in the `_TodosPageState` class.

```dart
Future<void> _initializeApp() async {
  
  // configure Amplify
  await _configureAmplify();
  
  // after configuring Amplify, update loading ui state to loaded state
  setState(() {
    _isLoading = false;
  });
}
```

Update the `_configureAmplify()` function in the `_TodosPageState` class.

```dart
Future<void> _configureAmplify() async {
  try {

    // add Amplify plugins
    await Amplify.addPlugins([_dataStorePlugin]);

    // configure Amplify
    // 
    // note that Amplify cannot be configured more than once!
    await Amplify.configure(amplifyconfig);
  } catch (e) {

    // error handling can be improved for sure!
    // but this will be sufficient for the purposes of this tutorial
    print('An error occurred while configuring Amplify: $e');
  }
}
```

Find the `build()` function in the `_TodosPageState` class and update the `Scaffold` > `body` parameter. (For your convenience, we added the updated code as a comment in the boilerplate)

``` diff
- body: Center(child: CircularProgressIndicator()),
+ body: _isLoading                                  // if in a loading state
+     ? Center(child: CircularProgressIndicator())  // display progress indicator
+     : TodosList(todos: _todos),                   // or the todos list otherwise
```

If you restart your app now, the progress indicator should disappear after Amplify is configured and an empty todos list should be displayed instead. Let’s add some todos!

## Manipulating data

### Creating a Todo
The *Add todo* button opens up a form to add todos. But, right now, the form does nothing when the *Save* button is pressed. Let’s fix that by having it save a **Todo** to DataStore.

Update the `_saveTodo()` function in the `_AddTodoFormState` class.

```dart
Future<void> _saveTodo() async {

  // get the current text field contents
  String name = _nameController.text;
  String description = _descriptionController.text;

  // create a new Todo from the form values
  // `isComplete` is also required, but should start false in a new Todo
  Todo newTodo = Todo(
      name: name,
      description: description.isNotEmpty ? description : null,
      isComplete: false);

  try {
    // to write data to DataStore, we simply pass an instance of a model to
    // Amplify.DataStore.save()
    await Amplify.DataStore.save(newTodo);

    // after creating a new Todo, close the form
    Navigator.of(context).pop();
  } catch (e) {
    print('An error occurred while saving Todo: $e');
  }
}
```

If you try to add todos using the form now, it should successfully close the form when pressing the *Save* button. But our Todo list is still empty even if you restart the app! After initializing our todos as an empty list, we aren't currently updating it again. We will remedy that in the next step.

### Querying for Todos

Now that we have a way to add Todo items, we need a way to list them out.

Update the `_initializeApp()` function in the `_TodosPageState` class.

```dart
Future<void> _initializeApp() async {

  // configure Amplify
  await _configureAmplify();

  // fetch Todo entries from DataStore
  await _fetchTodos();

  // after both configuring Amplify and fetching Todo entries, update loading
  // ui state to loaded state
  setState(() {
    _isLoading = false;
  });
}
```

Update the `_fetchTodos()` function in the `_TodosPageState` class. For the purposes of this tutorial, we will be querying for all stored **Todo** entries, but you can perform more advanced filtering, sorting or even pagination as well. You can [learn more](~/lib/datastore/data-access.md/q/platform/flutter#query-data) about DataStore data queries.

```dart
Future<void> _fetchTodos() async {
  try {
  
    // query for all Todo entries by passing the Todo classType to
    // Amplify.DataStore.query()
    List<Todo> updatedTodos = await Amplify.DataStore.query(Todo.classType);
    
    // update the ui state to reflect fetched todos
    setState(() {
      _todos = updatedTodos;
    });
  } catch (e) {
    print('An error occurred while querying Todos: $e');
  }
}
```

If you restart your app now, you should see your added todos start to show up on the list! However, if you add more entries, they don’t show up until you refresh the app. Let’s wire up the real-time data observation next.

### Observing updates to Todos

Amplify DataStore provides a way to subscribe to data updates to your model. We will use this to listen for change events and update our list accordingly.

To the top of the `_TodosPageState` class, add a `StreamSubscription`.

```dart
class _TodosPageState extends State<TodosPage> {

  // subscription to Todo model update events - to be initialized at runtime
  late StreamSubscription _subscription;
```

Update the `dispose()` function in the `_TodosPageState` class.

```dart
@override
void dispose() {

  // cancel the subscription when the state is removed from the tree
  _subscription.cancel();
  super.dispose();
}
```

Update the `_fetchTodos()` function in the `_TodosPageState` class.

```dart
Future<void> _initializeApp() async {

  // configure Amplify
  await _configureAmplify();
  
  // listen for updates to Todo entries by passing the Todo classType to
  // Amplify.DataStore.observe() and when an update event occurs, fetch the
  // todo list
  // 
  // note this strategy may not scale well with larger number of entries 
  _subscription = Amplify.DataStore.observe(Todo.classType).listen((event) {
    _fetchTodos();
  });

  // fetch Todo entries from DataStore
  await _fetchTodos();
  
  // after both configuring Amplify and fetching Todo entries, update loading
  // ui state to loaded state
  setState(() {
    _isLoading = false;
  });
}
```

If you restart your app now, you should see that newly added todos will also start showing up on the list. The items look like they can be check off and marked as completed, but when pressed, they don’t seem to do anything right now. Let’s learn how to update existing data.

### Updating a Todo

Updating an existing data entry looks a lot like creating a new one. It’s important to note, however, that models in DataStore are *immutable*. So, to update a record you must use a model’s `copyWith` function rather than manipulating its properties directly.

Update the `_toggleIsComplete()` function in the `TodoItem` class.

```dart
Future<void> _toggleIsComplete() async {

  // copy the Todo we wish to update, but with updated properties
  Todo updatedTodo = todo.copyWith(isComplete: !todo.isComplete);
  try {

    // to update data in DataStore, we again pass an instance of a model to
    // Amplify.DataStore.save()
    await Amplify.DataStore.save(updatedTodo);
  } catch (e) {
    print('An error occurred while saving Todo: $e');
  }
}
```

That’s it! Restart your app and you should now be able to toggle a todo between completed and not completed states. We’re almost done here but what if you want to delete an item from your todo list? We’ll go over how to do that next.

### Deleting a Todo

Deleting an existing data entry is even easier than updating one since you don’t need to copy the instance to delete it. It may not be the best user experience to do this but, for this app, we will trigger deletion of a todo item to a long press of the item.

Update the `_deleteTodo()` function in the `TodoItem` class.

```dart
void _deleteTodo(BuildContext context) async {
  try {
    // to delete data from DataStore, we pass the model instance to
    // Amplify.DataStore.delete()
    await Amplify.DataStore.delete(todo);
  } catch (e) {
    print('An error occurred while deleting Todo: $e');
  }
}
```

Reload your app once more and you should now be able to long press an item to delete it. Now we have a fully featured CRUD application that saves and retrieves data on the local device, which means this app **works without an AWS account or even an internet connection.** Next, we’ll connect it to AWS and make sure the data is available in the cloud but first, a note about Flutter Hot Reload and Hot Restart.

## Using Flutter Hot Reload and Hot Restart

Flutter offers [hot reload and hot restart](https://flutter.dev/docs/development/tools/hot-reload) functionality in order to aid the development process.

A key difference between hot reload and restart is that hot restart destroys the state in dart, while hot reload does not.

Amplify-flutter should automatically re-configure your application and re-wire its plugins upon a hot restart, so there is no additional effort needed on your part.

During **hot reload**, depending on how and when you are calling `Amplify.configure`, you may wish to check whether or not Amplify has already been configured using `Amplify.isConfigured` because it should not be configured more than once.  

To do this, you can use the `Amplify.isConfigured` getter.

<amplify-callout warning>

**Note**: Handling of hot restart was introduced with amplify-flutter version 0.1.2. If you have upgraded from a previous version, you may need to refresh your Amplify-related Pods in order to successfully leverage hot restart on the iOS platform. You should be able to do this by removing or modifying your `Podfile.lock` file in the `/ios` directory. When you rebuild your project, your Amplify pods should be at version 1.8.1 or above.

</amplify-callout>
