import React from 'react';
import Wrapper from '../assets/wrappers/StatItem';

export default function StatItem({ title, count, bcg, color, icon }) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  )
};
