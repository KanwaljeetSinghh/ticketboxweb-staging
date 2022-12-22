import React from 'react'

export default function MetaDecorator({title,description,imageUrl,imageAlt}) {
  return (
    <div>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={imageUrl}/>
        <meta property="og:url" content={window.location.pathname + window.location.search}/>
        <meta name="twitter:image:alt" content={imageAlt}/>
    </div>
  )
}
