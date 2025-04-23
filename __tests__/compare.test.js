import { expect, test } from 'vitest';
import findDiff from '../index.js';

test('equalJSON', () => {
  expect(findDiff('__fixtures__/file1.json', '__fixtures__/file1.json')).toBe(
    `{
    common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            key: value
            doge: {
                wow: 
            }
        }
    }
    group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
    group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`
  );
});

test('differentJSON', () => {
  expect(findDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(
    `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
        setting6: {
            key: value
            doge: {
              - wow: 
              + wow: so much
            }
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
  );
});

test('equalYAML', () => {
  expect(findDiff('__fixtures__/file1.yaml', '__fixtures__/file1.yaml')).toBe(`{
    common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            key: value
            doge: {
                wow: 
            }
        }
    }
    group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
    group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`);
});

test('differentYAML', () => {
  expect(findDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(`{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
        setting6: {
            key: value
            doge: {
              - wow: 
              + wow: so much
            }
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('JSON format', () => {
  expect(findDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json'))
    .toBe(`[
  {
    "type": "nested",
    "key": "common",
    "children": [
      {
        "type": "unchanged",
        "key": "setting1",
        "value": "Value 1"
      },
      {
        "type": "removed",
        "key": "setting2",
        "value": 200
      },
      {
        "type": "changed",
        "key": "setting3",
        "oldValue": true,
        "newValue": null
      },
      {
        "type": "nested",
        "key": "setting6",
        "children": [
          {
            "type": "unchanged",
            "key": "key",
            "value": "value"
          },
          {
            "type": "nested",
            "key": "doge",
            "children": [
              {
                "type": "changed",
                "key": "wow",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "type": "added",
            "key": "ops",
            "value": "vops"
          }
        ]
      },
      {
        "type": "added",
        "key": "follow",
        "value": false
      },
      {
        "type": "added",
        "key": "setting4",
        "value": "blah blah"
      },
      {
        "type": "added",
        "key": "setting5",
        "value": {
          "key5": "value5"
        }
      }
    ]
  },
  {
    "type": "nested",
    "key": "group1",
    "children": [
      {
        "type": "changed",
        "key": "baz",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "type": "unchanged",
        "key": "foo",
        "value": "bar"
      },
      {
        "type": "changed",
        "key": "nest",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "type": "removed",
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "type": "added",
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`);
});

test('Plain format', () => {
  expect(
    findDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain')
  ).toBe(`Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});
