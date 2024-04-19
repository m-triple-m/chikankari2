'use client';
import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './dropzone.module.css';

export function DropzoneButton({setSelFilename}) {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  const uploadFile = (files) => {
    const file = files[0];
    setSelFilename(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={uploadFile}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp, MIME_TYPES.svg]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          
          {/* <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group> */}

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            {/* <Dropzone.Idle>Upload resume</Dropzone.Idle> */}
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}