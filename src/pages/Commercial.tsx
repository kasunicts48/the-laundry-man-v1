import React from 'react';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';

export default function Commercial() {
  return (
    <InnerPageHeader
      eyebrow="Corporate Solutions"
      title={
        <>
          Commercial <InnerPageTitleHighlight>Cleaning</InnerPageTitleHighlight>.
        </>
      }
      description="Reliable, high-volume laundry and dry cleaning services for hotels, restaurants, and businesses. Get customized pricing and scheduled collections to keep your operations running smoothly."
    />
  );
}
