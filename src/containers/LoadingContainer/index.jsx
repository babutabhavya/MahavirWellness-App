import React from 'react';
import Loading from '../../screens/Loading';

export default function LoadingContainer({loading, children}) {
  return loading === true ? <Loading /> : children;
}
