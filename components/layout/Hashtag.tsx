export default function HashTag ({ value, textClass, hashtagClass, usernameClass, onClick }: PropTypes) {
	return (
		<p className={textClass}>
			{
				value.split(' ').map((word, index) => {
					if (word.length > 1) {
						if (word.startsWith('#')) {
							return (
								<span className={hashtagClass} key={index} onClick={() => onClick(word, 'hashtag')}>
									{word + ' '}
								</span>
							);
						}
						if (word.startsWith('@')) {
							return (
								<span className={usernameClass} key={index} onClick={() => onClick(word, 'username')}>
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
