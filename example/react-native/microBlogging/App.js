/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { PostList } from './src/acey'
import { useAcey } from 'acey'

import styled from 'styled-components'
import Post from './src/components/post'
import AddPostInput from './src/components/add-post-input'

const App = () => {

  useAcey([ PostList ])

  const onSubmit = (content) => {
    PostList.push({
      id: Math.random().toString(), 
      content, 
      created_at: new Date()
    }).save().localStore()
  }

  const onDelete = (post) => {
    PostList.delete(post).save().localStore()
  }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <ListContainer>
        <AddPostInput onSubmit={onSubmit} />
        {PostList.sortByCreationDate().map((post, index) => {
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

export default App;
