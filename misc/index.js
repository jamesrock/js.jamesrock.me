import probs from './js/probs';
import palendrome from './js/palendrome';
import estimate from './js/estimate';
import test from './js/test';

test(probs([1], [1, 2, 3], 3), 1/3*1/3*1/3);
test(probs([1], [1, 2, 3], 3, true), '1/27');
test(probs([1, 2], [1, 2, 3], 3), 2/3*2/3*2/3);
test(probs([1, 2], [1, 2, 3], 3, true), '2/27');
test(probs([1], [1, 2, 3, 4, 5, 6], 3), 1/6*1/6*1/6);

console.log('bob', probs([1], [1, 2, 3, 4, 5, 6], 3));
console.log('bob', probs([1, 5], [1, 2, 3, 4, 5, 6], 3, true));

test(palendrome('bob'), true);
test(palendrome('james'), false);
test(palendrome('hannah'), true);
test(palendrome('2002'), true);

test(estimate(5), 20);
test(estimate(30), 120);
test(estimate(60), 240);
