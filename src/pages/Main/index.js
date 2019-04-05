import React, { Component } from 'react';

import {
  Container, PodcastList, PageTitle, Podcast, Cover, Info, Title, Count,
} from './styles';

import podcasts from '~/utils/podcastsArr';

export default class Main extends Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <PodcastList
          ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
          data={podcasts}
          keyExtractor={podcast => String(podcast.id)}
          renderItem={({ item: podcast }) => (
            <Podcast onPress={() => {}}>
              <Cover source={{ uri: podcast.cover }} />
              <Info>
                <Title>{podcast.title}</Title>
                <Count>{`${podcast.tracks.length} episódios`}</Count>
              </Info>
            </Podcast>
          )}
        />
      </Container>
    );
  }
}
