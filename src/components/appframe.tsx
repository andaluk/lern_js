import React, { ReactNode } from 'react';

export const AppFrame = ({
  head1,
  head2,
  image,
  children,
  className,
}: {
  head1?: ReactNode;
  head2?: ReactNode;
  image?: string;
  children?: ReactNode;
  className?: string;
}) => (
  <>
    {head1 ? <h1>{head1}</h1> : ''}
    <div className={'msgFrame' + (className ? ' ' + className : '')}>
      {head2 ? (
        <h2>
          {image ? <img src={image} alt='' /> : ''} {head2}
        </h2>
      ) : (
        ''
      )}
      {children ? children : ''}
    </div>
  </>
);
