export default function HashTag ({ value, textClass, hashtagClass, usernameClass, onClick }: PropTypes) {
	const onClickHandler = (event: any, word: string, type: string) => {
		event.stopPropagation();
		onClick(word, type);
	};

	return (
		<p className={textClass}>
			{
				value.split(' ').map((word, index) => {
					if (word.length > 1) {
						if (word.startsWith('#')) {
							return (
								<span className={hashtagClass} key={index}
									onClick={(event) => onClickHandler(event, word, 'hashtag')}
								>
									{word + ' '}
								</span>
							);
						}
						if (word.startsWith('@')) {
							word = word.replace(':', '');
							return (
								<span className={usernameClass} key={index}
									onClick={(event) => onClickHandler(event, word, 'username')}
								>
									{word + ' '}
								</span>
							);
						}
					}
					return word + ' ';
				})
			}
		</p>
	);
}

interface PropTypes {
	value: string;
	textClass: string;
	hashtagClass: string;
	usernameClass: string;
	onClick: (word: string, type: string) => void;
}
