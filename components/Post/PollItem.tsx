import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCreateVotePoll from '../../api/hooks/feed/useCreateVote';
import { IPoll } from '../../api/hooks/feed/useFeed';
import { useMe } from '../../api/hooks/profile/useMe';
import { formatDate } from '../../utils/date';
import Text from '../UI/Text';

interface IPollItemProps {
  poll: IPoll;
}

function PollItem({ poll }: IPollItemProps) {
  const { handleCreateVotePoll } = useCreateVotePoll();
  const { profile } = useMe();
  const handleVotesPress = async (option: string) => {
    await handleCreateVotePoll({
      poll_id: poll.id,
      option,
    });
  };

  const checkVotedOption = (option: string) => {
    return poll.votes.find(
      (vote) => vote.option === option && vote.user_id === profile?.id,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pollItem}>
        <Image source={{ uri: poll?.user?.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text value={poll?.user?.username} weight="bold" />
              <Text value={formatDate(poll.created_at)} size="small" />
            </View>
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={24}
              color="#73788B"
            />
          </View>
          {poll.question && (
            <Text value={poll.question} style={{ marginVertical: 8 }} />
          )}
          <View style={styles.footer}>
            {poll.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionContainer,
                  checkVotedOption(option.option) && {
                    backgroundColor: '#E6F2FF',
                  },
                ]}
                onPress={() => handleVotesPress(option.option)}
              >
                <View style={[styles.optionSquare]} />
                <Text value={option.option} style={{ flex: 1 }} />
                <Text
                  value={`${option.percentage} %`}
                  style={styles.optionPercentage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  pollItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  footer: {
    marginTop: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    padding: 2,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    width: '100%',
  },
  optionSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  optionPercentage: {
    marginLeft: 'auto',
  },
});

export default PollItem;
