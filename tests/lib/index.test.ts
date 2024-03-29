import { test, expect } from '@jest/globals'
import * as zenodraft from '../../src/lib/index'


test('zenodraft exports', () => {

  const functions = Object.keys(zenodraft)
  expect(functions.length).toBe(14)
  expect(functions.includes('deposition_create_concept')).toBe(true)
  expect(functions.includes('deposition_create_version')).toBe(true)
  expect(functions.includes('deposition_delete')).toBe(true)
  expect(functions.includes('deposition_publish')).toBe(true)
  expect(functions.includes('deposition_show_details')).toBe(true)
  expect(functions.includes('deposition_show_draft')).toBe(true)
  expect(functions.includes('deposition_show_files')).toBe(true)
  expect(functions.includes('deposition_show_prereserved')).toBe(true)
  expect(functions.includes('file_add')).toBe(true)
  expect(functions.includes('file_delete')).toBe(true)
  expect(functions.includes('helpers_get_access_token_from_environment')).toBe(true)
  expect(functions.includes('helpers_get_api')).toBe(true)
  expect(functions.includes('metadata_update')).toBe(true)
  expect(functions.includes('metadata_validate')).toBe(true)
})
