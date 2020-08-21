Run the following commands to add a copy of the file `amplify/.config/local-env-info.json` to the 
directory `app/src/main/res/raw` in your Android project and rename the copy to `localenvinfo.json`:

```bash
cd [path to root directory of your Android project]
cp amplify/.config/local-env-info.json app/src/main/res/raw
mv app/src/main/res/raw/local-env-info.json app/src/main/res/raw/localenvinfo.json
```

If the amplify directory is not in your Android project folder, please follow the [project setup 
instructions](https://docs.amplify.aws/lib/project-setup/prereq/q/platform/android). The file 
`local-env-info.json` contains environment information that will be displayed on the developer menu.