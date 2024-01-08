'use client';
import React, { useEffect } from 'react';

export default function Sessions({ params }: { params: { id: string } }) {

  useEffect(() => {
    console.log(params.id)
      , [params.id];
  });

  return (
    <div>
      <h1>Session {params.id}</h1>
    </div>
  );
}