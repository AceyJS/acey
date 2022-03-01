
import React from 'react';
import {
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import { postlist } from './src/models'
import { useAcey } from 'react-acey'

import styled from 'styled-components/native'
import Post from './src/components/post'
import AddPostInput from './src/components/add-post-input'

export default () => {

  useAcey([ postlist ])

  const onSubmit = (content) => {
    postlist.push({
      id: Math.random().toString(), 
      content, 
      created_at: new Date()
    }).save().store()
  }

  const onDelete = (post) => postlist.delete(post).save().store()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <ListContainer>
        <AddPostInput onSubmit={onSubmit} />
        {postlist.sortByCreationDate().map((post, index) => {
          return (
            <View key={index}>
              <Post post={post} onDelete={onDelete} />
            </View>
          )
        })}
        </ListContainer>
      </ScrollView>
    </>
  );
};

const ListContainer = styled.View`
  align-items: center;
  flex: 1;
  margin-top: 80px;

`
