import xml2js from 'xml2js';
import MinusMail from '../../res/MinusMail.svg'
import gitIcon from '../../res/github.svg'

	const customSVG = {
		MinusMailIcon : MinusMail.svg.path[0]['$'].d,
        GithubIcon : gitIcon.svg.path[0]['$'].d
	}
   

export default (customSVG)