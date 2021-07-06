import { test, expect } from '@jest/globals'
import zenodraft from '../dist/zenodraft'


test('zenodraft exports', () => {

  const functions = Object.keys(zenodraft)
  expect(functions.length).toBe(14)
  expect(functions.includes('cli')).toBe(true)
  expect(functions.includes('deposition_create_in_existing_collection')).toBe(true)
  expect(functions.includes('deposition_create_in_new_collection')).toBe(true)
  expect(functions.includes('deposition_delete')).toBe(true)
  expect(functions.includes('deposition_publish')).toBe(true)
  expect(functions.includes('deposition_show_details')).toBe(true)
  expect(functions.includes('deposition_show_latest')).toBe(true)
  expect(functions.includes('deposition_show_prereserved')).toBe(true)
  expect(functions.includes('file_add')).toBe(true)
  expect(functions.includes('file_delete')).toBe(true)
  expect(functions.includes('helpers_get_access_token_from_environment')).toBe(true)
  expect(functions.includes('helpers_get_api')).toBe(true)
  expect(functions.includes('helpers_validate_in_collection_value')).toBe(true)
  expect(functions.includes('metadata_update')).toBe(true)
})