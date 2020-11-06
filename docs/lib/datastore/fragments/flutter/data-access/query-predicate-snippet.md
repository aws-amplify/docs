```dart
TBD
```

<amplify-callout warning>

**Note:** when constructing predicates, static `QueryField` instances such as `Post.RATING` do not own any information about the model to which the field belongs. In order to avoid any ambiguity between field names which are used across multiple models, it is recommended to construct a custom instance of `QueryField` in the form of `QueryField.field("{model-name}.{field-name}")` (i.e. `field("post.rating")`).

</amplify-callout>
