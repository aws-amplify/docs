import React, { useEffect } from 'react';
import { getWebContainer } from './webcontainer';

const StackBlitz = () => {
  let currentProcess;

  useEffect(() => {
    const insertTerminal = async () => {
      let webcontainerInstance = await getWebContainer();

      const terminalEl = document.getElementById('terminal');
      // mount the terminal to the page

      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');

      const terminal = new Terminal({
        convertEol: true
      });

      let fitAddon = new FitAddon();

      if (terminalEl) {
        terminal.loadAddon(fitAddon);
        terminal.open(terminalEl);
      }

      // already call `fit()` so that the terminal takes up the full height and width
      fitAddon.fit();

      startProcess(terminal);

      window.addEventListener('resize', () => {
        fitAddon.fit();

        currentProcess?.resize({
          cols: terminal.cols,
          rows: terminal.rows
        });
      });

      async function startProcess(terminal) {
        // Spawn a process and pass in the terminal dimensions
        currentProcess = await webcontainerInstance.spawn('jsh', {
          terminal: {
            cols: terminal.cols,
            rows: terminal.rows
          }
        });

        // Listen for all the output coming back from the process and write it to the terminal
        currentProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              terminal.write(data);
            }
          })
        );

        /**
         * Grab the stdin writer from the process, and write anything that the terminal instance
         * receives to the process.
         */
        const shellWriter = currentProcess.input.getWriter();

        terminal.onData((data) => {
          shellWriter.write(data);
        });

        await currentProcess.exit;
      }
    };

    insertTerminal();
  }, []);

  return <div id="terminal"></div>;
};

export default StackBlitz;
