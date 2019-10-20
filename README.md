# Taboola React Plugin - FORK https://www.npmjs.com/package/@mrkutly/taboola-react-plugin

forked to remove webpack dependency

## Integration

To use the plugin, you will need to include your publisher loader script in the head tag of you index.html file (or inside the head tags of each of your pages if you are using SSR like in Gatsby or Next.js). The loader script will look something like this:

```javascript
(function(e, f, u, i) {
	if (!document.getElementById(i)) {
		e.async = 1;
		e.src = u;
		e.id = i;
		f.parentNode.insertBefore(e, f);
	}
})(
	document.createElement('script'),
	document.getElementsByTagName('script')[0],
	'//cdn.taboola.com/libtrc/taboola-training/loader.js',
	'tb_loader_script'
);
```

Then, simply import it into the component where you would like it to render:

```javascript
import Taboola from '@mailtruck/taboola-react-plugin';
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
