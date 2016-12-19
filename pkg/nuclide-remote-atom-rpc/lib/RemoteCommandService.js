/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import type {AtomCommands} from './rpc-types';

import {CompositeDisposable} from 'event-kit';
import {CommandServer} from './CommandServer';

// This interface is exposed by the nuclide server process to the client side
// Atom process.
export class RemoteCommandService {
  _disposables: CompositeDisposable;

  constructor() {
    this._disposables = new CompositeDisposable();
  }

  async _registerAtomCommands(atomCommands: AtomCommands): Promise<void> {
    this._disposables.add(await CommandServer.register(atomCommands));
  }

  dispose(): void {
    this._disposables.dispose();
  }

  // Called by Atom once for each new remote connection.
  static async registerAtomCommands(
    atomCommands: AtomCommands,
  ): Promise<RemoteCommandService> {
    const result = new RemoteCommandService();
    await result._registerAtomCommands(atomCommands);
    return result;
  }
}
