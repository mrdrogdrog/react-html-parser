/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { parseDocument } from 'htmlparser2'
import { processNodes } from './processNodes'
import { ReactElement } from 'react'
import { Document } from 'domhandler'
import { NodeToReactElementTransformer } from './NodeToReactElementTransformer'

export interface ParserOptions {
  decodeEntities?: boolean
  transform?: NodeToReactElementTransformer
  preprocessNodes?: (nodes: Document) => Document
}

/**
 * Parses a HTML string and returns a list of React components generated from it
 *
 * @param {String} html The HTML to convert into React component
 * @param {Object} options Options to pass
 * @returns {Array} List of top level React elements
 */
export function convertHtmlToReact(
  html: string,
  { decodeEntities, transform, preprocessNodes }: ParserOptions
): (ReactElement | string | null)[] {
  let parsedDocument = parseDocument(html, {
    decodeEntities: decodeEntities ?? true
  })
  if (preprocessNodes) {
    parsedDocument = preprocessNodes(parsedDocument)
  }
  return processNodes(parsedDocument.childNodes, transform)
}
