# Taboola React Plugin

This [npm package](https://www.npmjs.com/package/@mrkutly/taboola-react-plugin) allows a publisher to easily load their taboola assets into their React application.

## Installation

Installation is very simple. Just add the plugin to your project by running.
`npm install @mrkutly/taboola-react-plugin`

## Integration

To use the plugin, simply import it into the component where you would like it to render:

```javascript
import Taboola from '@mrkutly/taboola-react-plugin';
```

Most of the props you pass it will be the params you received from Taboola for your asset. The only extra prop it needs it the URL of the current page (this allows us to accurately count your page views and crawl your article pages).

```jsx
import React from 'react';
import Taboola from '@mrkutly/taboola-react-plugin';

export default (props) => (
	<div>
		<h1>These dogs do amazing tricks<h1>
		<div>
			<p>This is the article about dogs<p>
            	</div>
		<Taboola
			currentUrl={'https://www.awesomenews.com/amazing-article-about-dogs-who-do-tricks'}
			publisher={'awesomenews'}
			pageType={'article'}
			placement={'Below Article Thumbnails'}
			mode={'thumbnails-a'}
			targetType={'mix'}
		/>
	</div>
);
```

And that's all!

## Issues

For any issues, email mark.sauer.utley@taboola.com
