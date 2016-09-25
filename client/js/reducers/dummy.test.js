import expect from 'expect';
import deepFreeze from 'deep-freeze';

import dummy from './dummy';

describe('dummy', () => {
   it('should be dummy', () => {
        const before = {};
        const action = {
          type: 'WAAGH!'
        };
        const after = {};

        deepFreeze(before);
        deepFreeze(action);

        expect(
           dummy(before, action)
        ).toEqual(after);
   });   
});
