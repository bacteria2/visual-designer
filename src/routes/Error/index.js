import React from 'react';
import Exception from '../../components/Exception';
import {
  Link
} from 'react-router-dom';

export function Error403(props){
  return  <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
}

export function Error404(props){
  return  <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
}

export function Error500(props){
  return  <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
}