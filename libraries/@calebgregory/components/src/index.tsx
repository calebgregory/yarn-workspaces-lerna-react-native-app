import * as React from 'react'
import { View, Text } from 'react-native'

interface Props {
  text: string
}

export const Words = ({ text }: Props) => {
  return <View>
    <Text>Words: {text}</Text>
  </View>
}

export const Thumbs = () => {
  return <View>
    <Text>{'👍 🤙'}</Text>
  </View>
};