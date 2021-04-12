When upgrading Amplify packages, it is important to make sure that there are no duplicate versions of Amplify packages in the `node_modules` folder tree as a result of the upgrade. Having multiple versions of packages can yield unexpected behavior as modules imported in your code might point to versions not configured by Amplify when calling `Amplify.configure`. To prevent this situation, you can [Check for duplicate versions](#check-for-duplicate-versions), and if duplicate versions exists, then [Upgrade Amplify packages](#upgrade-amplify-packages).

## Check for duplicate versions

The following commands will show you Amplify packages that appear multiple times in your `node_modules` folder. If the output is empty, it means that you don't have duplicate versions of Amplify packages.

<amplify-block-switcher>

<amplify-block name="Mac and Linux">

```sh
# Using YARN
yarn list --pattern amplify | \
  grep -o -e '@\?aws-amplify[^ ]*' | \
  sort | uniq | \
  sed -E 's/^(@?[^@]+).*$/\1/g' | \
  uniq -d | sort
```

```sh
# Using NPM
npm ls -all 2>/dev/null | \
  grep -o -e '@\?aws-amplify[^ ]*' | \
  sort | uniq | \
  sed -E 's/^(@?[^@]+).*$/\1/g' | \
  uniq -d | sort
```

</amplify-block>

<amplify-block name="Windows (PowerShell)">

```powershell
# Using YARN
yarn list --pattern amplify |
  Select-String -Pattern  '(@?aws\-amplify[^@]*).*(?<!deduped)$' | 
  %{$_.Matches.Groups[1].value} | Group-Object | 
  Where-Object { $_.Count -gt 1 } | Select-Object -ExpandProperty Name |
  Sort-Object
```

```powershell
# Using NPM
npm ls -all 2>$null |
  Select-String -Pattern  '(@?aws\-amplify[^@]*).*(?<!deduped)$' | 
  %{$_.Matches.Groups[1].value} | Group-Object | 
  Where-Object { $_.Count -gt 1 } | Select-Object -ExpandProperty Name |
  Sort-Object
```


</amplify-block>

</amplify-block-switcher>

---

## Upgrade Amplify packages

If you want to know update all Amplify packages to the `latest` version from npm and will make sure that only one version of every Amplify package is installed.

<amplify-block-switcher>

<amplify-block name="Mac and Linux">

```sh
# Using YARN
yarn upgrade --latest --pattern aws-amplify
```

```sh
# Using NPM
npx npm-check-updates -i '/@?aws-amplify/' && npm update
```

</amplify-block>

<amplify-block name="Windows (PowerShell)">

```powershell
# Using YARN
yarn upgrade --latest --pattern aws-amplify
```

```powershell
# Using NPM
npx npm-check-updates -i '/@?aws-amplify/' && npm update
```

</amplify-block>

</amplify-block-switcher>

## View latest Amplify package versions

Sometimes it is useful to know which set of Amplify package versions belong to a release.

<amplify-block-switcher>

<amplify-block name="Mac and Linux">

```sh
# Show latest versions of amplify packages
curl -s "https://api.github.com/repos/aws-amplify/amplify-js/commits/$(\
    npm info aws-amplify .gitHead\
  )" | jq -r '.commit.message'
```

</amplify-block>

<amplify-block name="Windows (PowerShell)">

```powershell
# Show latest versions of amplify packages
(ConvertFrom-Json (
  iwr "https://api.github.com/repos/aws-amplify/amplify-js/commits/$(
    npm info aws-amplify .gitHead
  )"
).Content).commit.message
```

</amplify-block>

</amplify-block-switcher>

The output of this command, would look similar to:

```
chore(release): Publish [ci skip] 
 - @aws-amplify/ui-angular@x.x.x
 - @aws-amplify/ui-components@x.x.x
 - @aws-amplify/ui-react@x.x.x
 - @aws-amplify/ui-storybook@x.x.x
 - @aws-amplify/ui-vue@x.x.x
 - @aws-amplify/analytics@x.x.x
 - @aws-amplify/api-graphql@x.x.x
 - @aws-amplify/api-rest@x.x.x
 - @aws-amplify/api@x.x.x
 - @aws-amplify/auth@x.x.x
 - aws-amplify-angular@x.x.x
 - aws-amplify-react@x.x.x
 - aws-amplify@x.x.x
 - @aws-amplify/cache@x.x.x
 - @aws-amplify/core@x.x.x
 - @aws-amplify/datastore@x.x.x
 - @aws-amplify/interactions@x.x.x
 - @aws-amplify/predictions@x.x.x
 - @aws-amplify/pubsub@x.x.x
 - @aws-amplify/pushnotification@x.x.x
 - @aws-amplify/storage@x.x.x
 - @aws-amplify/xr@x.x.x
```

All these versions were published as part of the same release, this means that if the versions you depend on are part of the same release, you won't have duplicated packages in your `node_modules`.