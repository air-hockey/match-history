import ResultTable from '../components/ResultTable/ResultTable';
import { testMatch } from '../components/ResultTable/matchResultTable.data';

export default () => testMatch.sets.map(s => <ResultTable players={testMatch.participants} set={s} matchWinner={testMatch.winner}/>)