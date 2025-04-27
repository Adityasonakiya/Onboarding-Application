package com.example.onboarding.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
public class FileUploadController {

    private static final String UPLOAD_DIR = "src/main/java/com/example/onboarding/uploads/";

    @PostMapping("/upload")
    public String uploadFiles(@RequestParam("files") MultipartFile[] files) {
        for (MultipartFile file : files) {
            // Validate file type
            String fileType = file.getContentType();
            if (!fileType.equals("image/png") && !fileType.equals("image/jpeg")
                    && !fileType.equals("application/msword")) {
                return "Invalid file type. Only, JPG, and DOC files are allowed.";
            }

            // Validate file size
            if (file.getSize() > 10 * 1024 * 1024) { // 10MB
                return "File size exceeds the limit of 10MB.";
            }

            try {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                Files.write(path, bytes);
            } catch (IOException e) {
                e.printStackTrace();
                return "Failed to upload files.";
            }
        }
        return "Files uploaded successfully.";
    }
}
