import { ActivityIndicator,View } from 'react-native';
const LoadingAnimation = ({ isLoading }) => {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };
  export default LoadingAnimation;
  