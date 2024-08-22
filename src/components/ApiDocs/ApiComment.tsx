import { View } from '@aws-amplify/ui-react';

export const ApiComment = ({ apiComment }) => {
    return (
        <View>
            {apiComment.map((snippet, idx) => {
                if (snippet.kind === "code") {
                    return <code>{snippet.text.replaceAll('`', '')}</code>
                } else {
                    const text = snippet.text;
                    if (idx === 0 && text.startsWith('-')) {
                        return text.slice(1);
                    } else {
                        return text;
                    }
                }
            })}
        </View>
    )
}