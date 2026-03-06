import {
  Accordion,
  Link,
  TableBody,
  TableRow,
  TableCell,
  Table
} from '@aws-amplify/ui-react';
import { PageNode } from '@/directory/directory';

type DocDownloadProps = {
  directoryData: PageNode;
};

export function DocDownload({ directoryData }: DocDownloadProps) {
  return (
    <Accordion.Container className="doc-download">
      <Accordion.Item value="Accordion-item">
        <Accordion.Trigger>
          Download Actions
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content className="doc-download-content">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Link href="#">Download as Markdown</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
}
