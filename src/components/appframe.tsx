import React, { ReactNode } from 'react';

// Блочный элемент с тенью, заголовками и картинкой
export const AppFrame = ({
  head1, // Заголовок за пределами рамки
  head2, // Заголовок внутри рамки
  image, // Картинка рядом с заголовком
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
    {head1 ? (
      <div>
        <h1>{head1}</h1>
      </div>
    ) : (
      ''
    )}
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
