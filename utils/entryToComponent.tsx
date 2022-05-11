import React, { FC } from 'react';
import { LoadingMask } from '../components/LoadingMask';
import { Entry, EntryDefinition } from '../types/Entry';
import { getEntryDefinition } from './getEntryDefinition';

export function NullComponent() {
  return null;
}

export default function entryToComponent<T extends Entry>(
  entry: T,
  method: keyof Omit<EntryDefinition<T>, 'parse'>,
): FC<{ entry: T }> {
  const definition = getEntryDefinition(entry.type) as EntryDefinition<any>;
  const getComponent = definition[method];

  if (!getComponent) {
    return NullComponent;
  }

  const Component = React.lazy(getComponent);

  return function ComponentWrapper({ entry }) {
    return (
      <React.Suspense
        fallback={<LoadingMask language={entry.language} label={entry.title} />}
      >
        <Component entry={entry} />
      </React.Suspense>
    );
  };
}
