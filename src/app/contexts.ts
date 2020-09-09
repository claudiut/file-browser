import React from 'react';

type RootOptionsParams = {serverApi: string};
// eslint-disable-next-line import/prefer-default-export
export const RootOptions = React.createContext(<RootOptionsParams>{});
