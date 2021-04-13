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

If you want to update all Amplify packages to the `latest` versions from npm, run the following command, it will also make sure that only one version of every Amplify package is installed.

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

If you want to see which set of Amplify package versions were published to npm as part of the latest release, you can run the following command:

<amplify-block-switcher>

<amplify-block name="Mac and Linux">

```sh
# Show latest versions of amplify packages
curl -s "https://api.github.com/repos/aws-amplify/amplify-js/commits/$(\
    npm info aws-amplify@latest .gitHead\
  )" | jq -r '.commit.message'
```

</amplify-block>

<amplify-block name="Windows (PowerShell)">

```powershell
# Show latest versions of amplify packages
(ConvertFrom-Json (
  iwr "https://api.github.com/repos/aws-amplify/amplify-js/commits/$(
    npm info aws-amplify@latest .gitHead
  )"
).Content).commit.message
```

</amplify-block>

</amplify-block-switcher>
