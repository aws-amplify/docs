# AMPLIFYRULES

title: Modeling relationships - AWS Amplify Gen 2 Documentation
source: https://docs.amplify.aws/typescript/build-a-backend/data/data-modeling/relationships/
framework: typescript
lastModified: 2024-10-21T23:11:46.997Z

---

WHEN MODELING APPLICATION DATA, YOU OFTEN NEED TO ESTABLISH RELATIONSHIPS BETWEEN DIFFERENT DATA MODELS. IN AMPLIFY DATA, YOU CAN CREATE ONE-TO-MANY, ONE-TO-ONE, AND MANY-TO-MANY RELATIONSHIPS IN YOUR DATA SCHEMA. ON THE CLIENT-SIDE, AMPLIFY DATA ALLOWS YOU TO LAZY OR EAGER LOAD OF RELATED DATA.

```typescript
const schema = a
  .schema({
    Member: a.model({
      name: a.string().required(), // 1. Create a reference field    teamId: a.id(),
      // 2. Create a belongsTo relationship with the reference field
      team: a.belongsTo("Team", "teamId"),
    }),
    Team: a.model({
      mantra: a.string().required(), // 3. Create a hasMany relationship with the reference field
      //    from the `Member`s model.
      members: a.hasMany("Member", "teamId"),
    }),
  })
  .authorization((allow) => allow.publicApiKey());
```

CREATE A "HAS MANY" RELATIONSHIP BETWEEN RECORDS

```typescript
const { data: team } = await client.models.Team.create({
  mantra: "Go Frontend!",
});
const { data: member } = await client.models.Member.create({
  name: "Tim",
  teamId: team.id,
});
```

UPDATE A "HAS MANY" RELATIONSHIP BETWEEN RECORDS

```typescript
const { data: newTeam } = await client.models.Team.create({
  mantra: "Go Fullstack",
});
await client.models.Member.update({ id: "MY_MEMBER_ID", teamId: newTeam.id });
```

DELETE A "HAS MANY" RELATIONSHIP BETWEEN RECORDS
IF YOUR REFERENCE FIELD IS NOT REQUIRED, THEN YOU CAN "DELETE" A ONE-TO-MANY RELATIONSHIP BY SETTING THE RELATIONSHIP VALUE TO NULL.

```typescript
await client.models.Member.update({ id: "MY_MEMBER_ID", teamId: null });
```

LAZY LOAD A "HAS MANY" RELATIONSHIP

```typescript
const { data: team } = await client.models.Team.get({ id: "MY_TEAM_ID" });
const { data: members } = await team.members();
members.forEach((member) => console.log(member.id));
```

EAGERLY LOAD A "HAS MANY" RELATIONSHIP

```typescript
const { data: teamWithMembers } = await client.models.Team.get(
  { id: "MY_TEAM_ID" },
  { selectionSet: ["id", "members.*"] }
);
teamWithMembers.members.forEach((member) => console.log(member.id));
```

```typescript
const schema = a
  .schema({
    Cart: a.model({
      items: a.string().required().array(),
      // 1. Create reference field
      customerId: a.id(),
      // 2. Create relationship field with the reference field
      customer: a.belongsTo("Customer", "customerId"),
    }),
    Customer: a.model({
      name: a.string(),
      // 3. Create relationship field with the reference field
      //    from the Cart model
      activeCart: a.hasOne("Cart", "customerId"),
    }),
  })
  .authorization((allow) => allow.publicApiKey());
```

CREATE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS
TO CREATE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS, FIRST CREATE THE PARENT ITEM AND THEN CREATE THE CHILD ITEM AND ASSIGN THE PARENT.

```typescript
const { data: customer, errors } = await client.models.Customer.create({
  name: "Rene",
});

const { data: cart } = await client.models.Cart.create({
  items: ["Tomato", "Ice", "Mint"],
  customerId: customer?.id,
});
```

UPDATE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS
TO UPDATE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS, YOU FIRST RETRIEVE THE CHILD ITEM AND THEN UPDATE THE REFERENCE TO THE PARENT TO ANOTHER PARENT. FOR EXAMPLE, TO REASSIGN A CART TO ANOTHER CUSTOMER:

```typescript
const { data: newCustomer } = await client.models.Customer.create({
  name: "Ian",
});
await client.models.Cart.update({ id: cart.id, customerId: newCustomer?.id });
```

DELETE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS
YOU CAN SET THE RELATIONSHIP FIELD TO NULL TO DELETE A "HAS ONE" RELATIONSHIP BETWEEN RECORDS.

```typescript
await client.models.Cart.update({ id: project.id, customerId: null });
```

LAZY LOAD A "HAS ONE" RELATIONSHIP

```typescript
const { data: cart } = await client.models.Cart.get({ id: "MY_CART_ID" });
const { data: customer } = await cart.customer();
```

EAGERLY LOAD A "HAS ONE" RELATIONSHIP

```typescript
const { data: cart } = await client.models.Cart.get(
  { id: "MY_CART_ID" },
  { selectionSet: ["id", "customer.*"] }
);
console.log(cart.customer.id);
```

MODEL A "MANY-TO-MANY" RELATIONSHIP
IN ORDER TO CREATE A MANY-TO-MANY RELATIONSHIP BETWEEN TWO MODELS, YOU HAVE TO CREATE A MODEL THAT SERVES AS A "JOIN TABLE". THIS "JOIN TABLE" SHOULD CONTAIN TWO ONE-TO-MANY RELATIONSHIPS BETWEEN THE TWO RELATED ENTITIES. FOR EXAMPLE, TO MODEL A POST THAT HAS MANY TAGS AND A TAG HAS MANY POSTS, YOU'LL NEED TO CREATE A NEW POSTTAG MODEL THAT RETYPESCRIPTSENTS THE RELATIONSHIP BETWEEN THESE TWO ENTITIES.

```typescript
const schema = a
  .schema({
    PostTag: a.model({
      // 1. Create reference fields to both ends of
      //    the many-to-many relationshipCopy highlighted code example
      postId: a.id().required(),
      tagId: a.id().required(),
      // 2. Create relationship fields to both ends of
      //    the many-to-many relationship using their
      //    respective reference fieldsCopy highlighted code example
      post: a.belongsTo("Post", "postId"),
      tag: a.belongsTo("Tag", "tagId"),
    }),
    Post: a.model({
      title: a.string(),
      content: a.string(),
      // 3. Add relationship field to the join model
      //    with the reference of `postId`Copy highlighted code example
      tags: a.hasMany("PostTag", "postId"),
    }),
    Tag: a.model({
      name: a.string(),
      // 4. Add relationship field to the join model
      //    with the reference of `tagId`Copy highlighted code example
      posts: a.hasMany("PostTag", "tagId"),
    }),
  })
  .authorization((allow) => allow.publicApiKey());
```

MODEL MULTIPLE RELATIONSHIPS BETWEEN TWO MODELS
RELATIONSHIPS ARE DEFINED UNIQUELY BY THEIR REFERENCE FIELDS. FOR EXAMPLE, A POST CAN HAVE SEPARATE RELATIONSHIPS WITH A PERSON MODEL FOR AUTHOR AND EDITOR.

```typescript
const schema = a
  .schema({
    Post: a.model({
      title: a.string().required(),
      content: a.string().required(),
      authorId: a.id(),
      author: a.belongsTo("Person", "authorId"),
      editorId: a.id(),
      editor: a.belongsTo("Person", "editorId"),
    }),
    Person: a.model({
      name: a.string(),
      editedPosts: a.hasMany("Post", "editorId"),
      authoredPosts: a.hasMany("Post", "authorId"),
    }),
  })
  .authorization((allow) => allow.publicApiKey());
```

ON THE CLIENT-SIDE, YOU CAN FETCH THE RELATED DATA WITH THE FOLLOWING CODE:

```typescript
const client = generateClient<Schema>();
const { data: post } = await client.models.Post.get({ id: "SOME_POST_ID" });
const { data: author } = await post?.author();
const { data: editor } = await post?.editor();
```

MODEL RELATIONSHIPS FOR MODELS WITH SORT KEYS IN THEIR IDENTIFIER
IN CASES WHERE YOUR DATA MODEL USES SORT KEYS IN THE IDENTIFIER, YOU NEED TO ALSO ADD REFERENCE FIELDS AND STORE THE SORT KEY FIELDS IN THE RELATED DATA MODEL:

```typescript
const schema = a
  .schema({
    Post: a.model({
      title: a.string().required(),
      content: a.string().required(),
      // Reference fields must correspond to identifier fields.
      authorName: a.string(),
      authorDoB: a.date(),
      // Must pass references in the same order as identifiers.
      author: a.belongsTo("Person", ["authorName", "authorDoB"]),
    }),
    Person: a
      .model({
        name: a.string().required(),
        dateOfBirth: a.date().required(),
        // Must reference all reference fields corresponding to the
        // identifier of this model.
        authoredPosts: a.hasMany("Post", ["authorName", "authorDoB"]),
      })
      .identifier(["name", "dateOfBirth"]),
  })
  .authorization((allow) => allow.publicApiKey());
```

MAKE RELATIONSHIPS REQUIRED OR OPTIONAL
AMPLIFY DATA'S RELATIONSHIPS USE REFERENCE FIELDS TO DETERMINE IF A RELATIONSHIP IS REQUIRED OR NOT. IF YOU MARK A REFERENCE FIELD AS REQUIRED, THEN YOU CAN'T "DELETE" A RELATIONSHIP BETWEEN TWO MODELS. YOU'D HAVE TO DELETE THE RELATED RECORD AS A WHOLE.

```typescript
const schema = a
  .schema({
    Post: a.model({
      title: a.string().required(),
      content: a.string().required(),
      // You must supply an author when creating the post
      // Author can't be set to `null`.
      authorId: a.id().required(),
      author: a.belongsTo("Person", "authorId"),
      // You can optionally supply an editor when creating the post.
      // Editor can also be set to `null`.
      editorId: a.id(),
      editor: a.belongsTo("Person", "editorId"),
    }),
    Person: a.model({
      name: a.string(),
      editedPosts: a.hasMany("Post", "editorId"),
      authoredPosts: a.hasMany("Post", "authorId"),
    }),
  })
  .authorization((allow) => allow.publicApiKey());
```
