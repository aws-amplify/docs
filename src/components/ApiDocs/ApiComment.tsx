import { View } from '@aws-amplify/ui-react';

export const ApiComment = ({ apiComment }) => {
    return (
        <View>
            {apiComment.map((snippet) => {
                if (snippet.kind === "code") {
                    return <code>{snippet.text.replaceAll('`', '')}</code>
                } else {
                    return snippet.text
                }
            })}
        </View>
    )
}