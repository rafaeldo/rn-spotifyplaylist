import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerActions from '~/store/ducks/player';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  EpisodeList,
  PodcastDetails,
  Background,
  Cover,
  PodcastTitle,
  PlayButton,
  PlayButtonText,
  Episode,
  Author,
  Title,
  BackButton,
} from './styles';

class Podcast extends Component {
  handleBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  handlePlay = (episodeId) => {
    console.tron.log('o id do episodio e:', episodeId);
    const { setPodcastReq, navigation } = this.props;
    const podcast = navigation.getParam('podcast');

    setPodcastReq(podcast, episodeId);
  };

  render() {
    const { navigation } = this.props;
    const podcast = navigation.getParam('podcast');

    return (
      <Container>
        <EpisodeList
          ListHeaderComponent={() => (
            <PodcastDetails>
              <Background source={{ uri: podcast.cover }} blurRadius={5} />

              <BackButton onPress={this.handleBack}>
                <Icon name="arrow-back" size={24} color="#FFF" />
              </BackButton>
              <Cover source={{ uri: podcast.cover }} />

              <PodcastTitle>{podcast.title}</PodcastTitle>

              <PlayButton onPress={() => this.handlePlay()}>
                <PlayButtonText>REPRODUZIR</PlayButtonText>
              </PlayButton>
            </PodcastDetails>
          )}
          data={podcast.tracks}
          keyExtractor={episode => String(episode.id)}
          renderItem={({ item: episode }) => (
            <Episode onPress={() => this.handlePlay(episode.id)}>
              <Title>{episode.title}</Title>
              <Author>{episode.artist}</Author>
            </Episode>
          )}
        />
      </Container>
    );
  }
}

// MAP STATE and ACTIONS
// const mapStateToProps = state => ({
//   //
// });

const mapActionsToProps = dispatch => bindActionCreators(PlayerActions, dispatch);
//

// EXPORT
export default connect(
  null,
  mapActionsToProps,
)(Podcast);
