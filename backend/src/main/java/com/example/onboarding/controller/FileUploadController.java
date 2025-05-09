package com.example.onboarding.controller;

import com.example.onboarding.model.EvidenceDTO;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*") // Allow CORS for all origins
@RestController
public class FileUploadController {

    private static final String UPLOAD_DIR = "src/main/resources/uploads/";

    @PostMapping("/upload")
    public List<EvidenceDTO> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<EvidenceDTO> evidenceList = new ArrayList<>();

        for (MultipartFile file : files) {
            // Validate file type
            String fileType = file.getContentType();
            if (fileType == null || (!fileType.equals("image/png") && !fileType.equals("image/jpeg")
                    && !fileType.equals("application/msword")
                    && !fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
                throw new IllegalArgumentException("Invalid file type. Only PNG, JPG, DOC, and DOCX files are allowed.");
            }

            // Validate file size
            if (file.getSize() > 10 * 1024 * 1024) { // 10MB
                throw new IllegalArgumentException("File size exceeds the limit of 10MB.");
            }

            try {
                // Ensure the upload directory exists
                Path uploadDir = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }

                // Save the file
                Path path = uploadDir.resolve(file.getOriginalFilename());
                Files.write(path, file.getBytes());

                // Create EvidenceDTO object
                EvidenceDTO evidence = new EvidenceDTO();
                evidence.setFileName(file.getOriginalFilename()); // Set the file name
                evidenceList.add(evidence);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to upload files.");
            }
        }

        return evidenceList; // Return the list of EvidenceDTO objects
    }
}