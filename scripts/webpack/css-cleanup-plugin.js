/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = class CssCleanupPlugin {
  constructor({
    outputDirRelativePath,
    pathResolver,
    globber,
    fsExtraLib = require('fs-extra'),
  } = {}) {
    this.outputDirRelativePath_ = outputDirRelativePath;

    /** @type {!PathResolver} */
    this.pathResolver_ = pathResolver;

    /** @type {!Globber} */
    this.globber_ = globber;

    /** @type {!FsExtraLib} */
    this.fsExtraLib_ = fsExtraLib;
  }

  apply(compiler) {
    compiler.plugin('done', () => this.nukeEm_());
  }

  // https://youtu.be/SNAK21fcVzU
  nukeEm_() {
    this.globber_.getAbsolutePaths(this.outputDirRelativePath_, '**/*.css.js*').forEach((absolutePath) => {
      this.fsExtraLib_.removeSync(absolutePath);
    });
  }
};
