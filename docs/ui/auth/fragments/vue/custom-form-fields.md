```html
<template>
  <amplify-authenticator username-alias="email">
    <amplify-sign-up
      slot="sign-up"
      username-alias="email"
      :form-fields.prop="formFields"
    ></amplify-sign-up>
    <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
  </amplify-authenticator>
</template>
```

<amplify-callout warning>
If you have <code>eslint-plugin-vue</code> configured, it will suggest you to use <code>v-slots</code> on Vue 3 or later. This is applicable to Vue component slot specification but not the web component slots. You can disable this rule to avoid the error.
</amplify-callout>

```js
<script>
export default {
  name: 'AuthWithSlots',
  data() {
    return {
      formFields: [
        {
          type: 'email',
          label: 'Custom email Label',
          placeholder: 'custom email placeholder',
          required: true,
        },
        {
          type: 'password',
          label: 'Custom Password Label',
          placeholder: 'custom password placeholder',
          required: true,
        },
        {
          type: 'address',
          label: 'Custom Address Label',
          placeholder: 'Enter your address',
          required: false,
        },
      ]
    }
  }
}
</script>
```