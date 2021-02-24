import * as React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../utils/constants';

interface Props {
  numberOfLines?: number,
  color?: string,
  fontSize?: number,
}

const Title: React.FunctionComponent<Props> = (props) => (
  <Text
  numberOfLines={props.numberOfLines}
    style={{
      fontSize: props.fontSize,
      color: props.color
    }}>
    {props.children}
  </Text>
);

Title.defaultProps = {
  numberOfLines: 3,
  color: Colors.grayscale.BLACK,
  fontSize: 22
}

export default Title;
