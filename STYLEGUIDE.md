# Amplify Docs Styleguides

These are the guidelines we use to write our docs. When reviewing writings, for instance in PRs, refer to the rules by their number for easy reference.

## 1. “Amplify [product]” not “Amplify Framework”

When writing, refer specifically to the Amplify product in question: UI, CLI, Libraries, Studio, or Hosting. In the past, when Amplify was a handful of JavaScript libraries and a CLI, “Amplify Framework” was a useful umbrella term. But now it is confusing.

### Don’t

“Amplify Framework has an authentication UI component that provides an entire authentication flow.”

### Do

“Amplify UI has an authentication UI component that provides an entire authentication flow.”
* * *

## 2. “Amplify project” not “Amplify app”

We call them “Amplify projects” to underscore that Amplify features can be used in any project, any app. We don’t use “Amplify app” because it sounds like Amplify is a platform (“iOS app” or “web app”).

### Don’t

“Get started with a new Amplify app!”

### Do

“Get started with a new Amplify project!”
* * *

## 3. Do not assume proficiency

Avoid using language that assumes someone’s level of proficiency. Something that is difficult for someone new to programming may not be for a senior engineer. This language can inadvertently alienate or insult a reader. Avoid words like “just,” “easy,” “senior,” “hard.”

### Don’t

* “Just implement a cache, and your images will be served nearby your user.” Use of “just” implies reader knows how to do this.
* “It’s easy to import Amplify UI components to your app.” “Easy” implies either the reader finds this difficult with other components, or, if the reader is still learning how to import components, it can undermine their confidence.

### Do

* “You can implement a cache to serve images from nearby your user.” Indicates it is possible. Bonus: link to guide on implementing a cache!
* “You can import Amplify UI components into your app with 2 lines of code.” Use objective numbers and facts to explain the level of complexity readers can expect, not adjectives.

* * *

## 4. Be culturally neutral; avoid colloquialisms and pop culture references

Different cultures have different idioms, different “in-jokes,” and different pop cultures. Using idioms, turns of phrase, and references to “common” stories and franchises in our documentation to sound more approachable can have the opposite effect, alienating people from different cultures who do not get the references by assuming universality of a dominant culture. What’s more, colorful phrases can make it harder to auto-translate documentation as well. So we use references that can be universally understood across cultures when distilled to factual statements

### Don’t

“Something that is difficult for someone new to programming may be child’s play for a senior engineer.”

“Every Han Solo has his Chewbacca: find a study buddy to team up with.”

### Do

“Something that is difficult for someone new to programming may not be for a senior engineer.”
 
“Studying in pairs can help you see problems in a new light, so find a study buddy to team up with.”
* * *

## 5. “We” are the authors; “you” is the reader

When writing, use “you” to refer to the reader, use “we” to refer to the team writing docs and building Amplify. Using “we” is popular in technical blogs and YouTube content where the author is individually taking the person on the other side of the screen on a journey. They may say things like, “To access the console, we just use `amplify console`.” This is confusing in official docs because they are written by many people and represent the team that builds Amplify. “We” should be used very rarely in documentation—only when explaining technical decisions or official recommendations where you could substitute “Amplify Team.”

### Don’t

“Congratulations, our app is online!”

“Amplify recommends you use X because it’s been built to run with Feature Y.”

### Do

“Congratulations, your app is online!”

“We recommend you use X because it’s been built to run with Feature Y.”
* * *

## 6. Use American English

English comes in many flavors. This site uses American English as most of its core contributors and maintainers use American English.

### Don’t

“You may realise your programme is running faster now.”

### Do

“You may realize your program is running faster now.”
* * *

## 7. Use task and outcome-based headings and titles that use verbs

Where possible, use action verbs or gerunds (nouns ending -ing—like “kayaking”) in headings and titles that describe a task or outcome. Avoid nouns and phrases that begin with prepositions and vague words like “about,” “advanced,” “intro.” 

**Guideline:** If you can’t think of an action-oriented title, there’s a chance this content will end up in the information architecture equivalent of a “junk drawer” where many disparate pieces of edge case content are thrown together an not found by the people who need it. **If you’re stuck, solicit ideas!**

### Don’t

“Intro to Amplify”

“Data modeling” (this is a sneaky noun!)

“Advanced Analytics”

“Data intro”

### Do

“Get started with Amplify”

“Modeling your data / Model your data”

“Setting up Analytics for single page apps”

“How to model your data'”
* * *

## 8. Hyphens? Spaces? Neither!

New words tend to be hyphenated or spaced while still new. Programmers tend to save a keystroke by writing them together, and search engines trends reflect this with concatenated words being searched for more. When in doubt: concatenate. It may not be “correct” to the Oxford English Dictionary, but it is the convention the community uses. We follow community convention.

### Don’t

“Front end and full-stack developers often JavaScript.”

### Do

“Frontend and fullstack developers use JavaScript.”
* * *

## 9. Emojis are for personal blogs, Twitter, “flavor” content

Do not use emojis. They are too casual for official docs and may not translate universally to all audiences.

### Don’t

“👏 Congratulations, your app is online!”

### Do

“Congratulations, your app is online!”
* * *

## 10. Avoid pronouns

Pronouns are difficult to translate into some languages. They also tend to be gendered, which provides unnecessary bias.


### Don’t

“When he opens the app, he will see a loading screen.”

### Do

“When the user opens the app, it will show a loading screen.”
* * *

## 11. Avoid gerunds (-ing words)

"To" forms of verbs are easier to translate.

### Don’t

“Setting up Amplify UI only takes two lines of code.”

### Do

“You can set up Amplify UI with two lines of code.”
* * *

## 12. Shorter is better

Short sentences are easier to translate, for both machines and humans! Break clauses into multiple sentences.

### Don’t

“If you are looking to enable triggers for the Storage Category with Amazon S3 & Amazon DynamoDB as Providers, the CLI supports associating Lambda triggers with S3 and DynamoDB events.”

### Do

“You can enable triggers for the Storage Category with Amazon S3 & Amazon DynamoDB as Providers. Amplify supports associating Lambda triggers with S3 and DynamoDB events.”
* * *

## 13. Lead with location; end with action

When instructing a learner on how to do something, start with the location of the action they’re going to perform so they can navigate to that place, then end with the action they can then use.

### Don’t

“Select **Edge optimized** in the **Endpoint Type** drop-down.”

### Do

“In the **Endpoint Type** drop-down, select **Edge optimized.”**
* * *

## 14. Use monospace fonts for code, commands, copy-ables; use bold for menus, URLs (clickable), and other UI copy

Code tags and monospace fonts are used to represent code that goes into files or CLI. UI copy, file names, URLs you can click on use **bold.** Remember: monospace is for anything that lives in or is copied to a file or a command line. Everything else is bold.

### Don’t

“To create a new file, go to ‘Menu’ and click on `new file`.”

“In your browser, open `http://localhost:3000/` ”

“Enter the Amplify Library for Swift GitHub repo URL (`https://github.com/aws-amplify/amplify-swift`) into the search bar and hit **Enter**.”

### Do

“To create a new file, go to **Menu > New File.”**

“In your browser, open **http://localhost:3000/”**

“Enter the Amplify Library for Swift GitHub repo URL (`https://github.com/aws-amplify/amplify-swift`) into the search bar and hit **Enter**.”
* * *

## 15. Use carets to help users navigate menus; use “select” instead of “click”

* For instructions for navigating a menu, use carets to indicate the hierarchy of the menu items. This is concise and easy to follow.
* Tell people to “select” things instead of “click on them”. Not everyone uses a mouse—many people tab or touch items.


### Don’t

“To create a new file, go to ‘Menu,’ select ‘Art,’ and click on ‘new file’.”

“Click on ‘upload image.’”

### Do

“To create a new file, go to **Menu > Art > New File**.”

“Select **upload image**.”
* * *

## 16. Bracket `<replacement text>` in codeblocks

In code blocks, refer to placeholder text with angle brackets, lowercase, with dashes. 

### Don’t

* `amplify/backend/api/~apiname~/schema.graphql`
* `amplify/backend/api/YOUR-API-NAME/schema.graphql`
* `amplify/backend/api/<YOUR_API_NAME>/schema.graphql`
* `amplify/backend/api/<your_api_name>/schema.graphql`
* `amplify/backend/api/<your api name>/schema.graphql`
* `amplify/backend/api/{yourAPIname}/schema.graphql`

### Do

**`amplify/backend/api/<api-name>/schema.graphql`**
* * *

## 17. Refer to Amplify files in the /amplify directory

When referring to files in the **amplify** directory, always preface with **amplify/**

### Don’t

**`backend/api/<api-name>/schema.graphql`**

### Do

**`amplify/backend/api/<api-name>/schema.graphql`**

* * *

## 18. Write compliant JSON: no single quotes, no comments

Conform to the [JSON standard](https://www.json.org/json-en.html). 

* Key names are enclosed in `"`
* Values are between `"` instead of `'`
* No comments

* Only JavaScript and TypeScript let you use double and single quotes interchangeably. This means that when people from other platforms copy-paste JSON from our examples, they run into errors.

### Don’t

```json
{
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  // REQUIRED - Amazon Cognito Region
  region: 'XX-XXXX-X'
}
```

### Do

```json
{
  "identityPoolId": "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
  "region": "XX-XXXX-X"
}
```

## 19. Prefix AWS and Amazon products when they first appear on a page

When an AWS service or product appears on the page for the first time, refer to it with the appropriate prefix, either AWS or Amazon. You can [find a full listing here.](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)

### Don’t

“Amplify Hosting uses S3 for file storage. Amplify Hosting also provides caching to ensure files are delivered quickly to users.”

### Do

“AWS Amplify Hosting uses Amazon Simple Storage Service (S3) for file storage. Amplify Hosting also provides caching to ensure files are delivered quickly to users.”
* * *

## 20. Write links using markdown syntax

When editing text content in markdown files use the markdown syntax for links.

### Don't

`<a>Use html link tags</a>`

### Do

\[Use mdx link syntax](/your-link-here)
