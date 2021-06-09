---
title: Amplify Codegen Models - List and list components nullability
description: Generating Amplify models with Amplify CLI x.y.z
---

### **What is changing?** 

Amplify CLI x.y.z has updated the codegen process to correctly set the optionality for types in models.

_Schema example_

```
type ListStringContainer @model {
  stringList: [String!]!
  stringNullableList: [String!]
  nullableStringList: [String]!
  nullableStringNullableList: [String]
}
```

In this example, there are four fields with different combinations of optionality:
- `stringList` - the list component and the list is required
- `stringNullableList` - the list component is required, the list is optional
- `nullableStringList` - the list component is optional, the list is required
- `nullableStringNullableList` - the list component and list is optional

> The list component in this example is a String type, however, this applies for other types as well such as Int, Bool, and embedded types that you define yourself.

### **Why are we introducing this change?** 

This is to align the optionality of the generated Swift models as closely as possible to the type defined in the schema.

### **Who is impacted?** 

<amplify-block-switcher>

<amplify-block name="iOS">

Developers building an iOS app with Amplify DataStore or Amplify API generates Swift models by running the command `amplify codegen models`. 

 _Previous generated Swift code_

```swift
public struct ListStringContainer: Model {
  public var stringList: [String]
  public var stringNullableList: [String]
  public var nullableStringList: [String]?
  public var nullableStringNullableList: [String]?
  ...
}
```

_Current code generated Swift model_

```swift
public struct ListStringContainer: Model {
  public var stringList: [String]
  public var stringNullableList: [String]?
  public var nullableStringList: [String?]
  public var nullableStringNullableList: [String?]?
  ...
}
```

The difference between the current and previous code:

- `stringList` - No changes
- `stringNullableList` - the list was required and is now optional.
- `nullableStringList` - the list component was required and is now optional. The list was optional and is now required
- `nullableStringNullableList` - the list component was required and is now optional. 

</amplify-block>

</amplify-block-switcher>


### **When do I have to upgrade?**

This is behind a feature flag in Amplify CLI x.y.z and will be deprecated by [TODO: DATE]. Developers with existing apps should upgrade to the latest CLI, set the feature flag, and update their app code to account for the change in optionality of the types. Developers building a new app will automatically generate code with the latest changes and no action is required.

### **Where do I make these changes?**

1. Update Amplify CLI to the latest version

```
amplify upgrade
```

2. The version should be at least x.y.z

```
amplify --v // at least x.y.z
```

3. If building an existing app, toggle the feature flag to true in TODO: PATH

4. Run `amplify codegen models` to generate the latest models.

5. Open the App and make sure the app compiles. Depending on your schema, you may be in the following scenarios.

<amplify-block-switcher>

<amplify-block name="iOS">

Scenario 1. Schema: `stringNullableList: [String!]`

```swift
// Previous - Swift type
public var stringNullableList: [String]

// Current - Swift type
public var stringNullableList: [String]?

// Previous - Code 
print(container.stringNullableList) // ["value1", "value2"]

// Current - Code
if let stringNullableList = container.stringNullableList { 
    print(stringNullableList) // ["value1", "value2"]
}
```

Since the list was required and is now optional, unwrap the optional to retrieve the values.

**Recommendation:** Update the type in the schema from `[String!]` to`[String!]!` to make the list required if you do not have an app use case for storing a null list. This will remove the need to unwrap the list in code.

 Scenario 2. Schema: `nullableStringList: [String]!`

```swift
// Previous - Swift type
public var nullableStringList: [String]?

// Current - Swift type
public var nullableStringList: [String?]

// Previous - Code
if let nullableStringList = container.nullableStringList { 
    print(nullableStringList) // ["value1", "value2"]
    for value in nullableStringList {
        print(value) // "value1", "value2
    }
}

// After
print(container.nullableStringList) // [Optional("value1"), Optional("value2")]
for value in container.nullableStringList {
    if let value = value {
        print(value) // "value1", "value2
    }
}
```

Since the list component was required and is now optional, unwrap the optional value to retrieve the value. The list was optional and is now required, remove any unwrapping done for the list.

**Recommendation:** Update the type in the schema from `[String]!` to `[String!]!` to make the list component required if you do not store null values in the list. This will remove the need to unwrap the list component in code.

Scenario 3. Schema: `nullableStringNullableList: [String]`

```swift
// Previous - Swift type
public var nullableStringNullableList: [String]?

// Current - Swift type
public var nullableStringNullableList: [String?]?

// Previous - Code
if let nullableStringNullableList = container.nullableStringNullableList { 
    print(nullableStringList) // ["value1", "value2"]
    for value in nullableStringList {
        print(value) // "value1", "value2
    }
}

// After
if let nullableStringNullableList = container.nullableStringNullableList { 
    print(nullableStringList) // [Optional("value1"), Optional("value2")]
    for value in nullableStringList {
        if let value = value {
            print(value) // "value1", "value2
        }
    }
}
```

Since the list component was required and is now optional, unwrap the optional value to retrieve the value.

**Recommendation:** Update the type in the schema from `[String]` to `[String!]!` to make the list and list component required if you do not store null values in the list or a null list. This will remove the need to unwrap the list and the list components.


</amplify-block>

</amplify-block-switcher>