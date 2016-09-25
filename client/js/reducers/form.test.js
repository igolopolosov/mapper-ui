import expect from 'expect';
import deepFreeze from 'deep-freeze';

import form from './form';

describe('form', () => {
   it('should be dummy', () => {
        const before = {};
        const action = {
          type: 'WAAGH!'
        };
        const after = {};

        deepFreeze(before);
        deepFreeze(action);

        expect(
           form(before, action)
        ).toEqual(after);
   });
});
