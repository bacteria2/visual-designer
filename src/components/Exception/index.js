import React, { createElement } from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import styled from 'styled-components';
import Theme from '@/theme'


let ExceptionContainer=styled.div`
  display: flex;
  align-items: center;
  height: 100%; 
  @media screen and (max-width: ${Theme.screenSm}) {
    display: block;
    text-align: center;
  }`,
  ImageBlock=styled.div`
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    
    @media screen and (max-width: ${Theme.screenXl}) {
       padding-right: 88px;
    }
    
    @media screen and (max-width: ${Theme.screenSm}) {
      padding-right: 0;
      margin: 0 auto 24px;
    }  
    
    @media screen and (max-width: @screen-xs) {
      margin-bottom: -24px;
      overflow: hidden;
    }
    
    zoom: 1;
    &:before,
    &:after {   
     content: " ";
     display: table;
    }
    &:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }`,
  imgEle=styled.div`
    height: 360px;
    width: 100%;
    max-width: 430px;
    float: right;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 100% 100%;
  `,
  content=styled.div`
    flex: auto;
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  `

export default ({ className, linkElement = 'a', type, title, desc, img, actions, rest }) => {
  const pageType = type in config ? type : '404';
  return (
    <ExceptionContainer className={className} {...rest}>
      <ImageBlock>
        <imgEle
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </ImageBlock>
      <content>
        <h1>{title || config[pageType].title}</h1>
        <div className='desc'>{desc || config[pageType].desc}</div>
        <div className='actions'>
          {
            actions ||
              createElement(linkElement, {
                to: '/',
                href: '/',
              }, <Button type="primary">返回首页</Button>)
          }
        </div>
      </content>
    </ExceptionContainer>
  );
};
