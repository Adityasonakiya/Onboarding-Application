package com.example.onboarding.controller;

import java.io.IOException;
// import java.net.http.HttpHeaders; // Remove this import
import org.springframework.http.HttpHeaders;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.repository.EvidenceRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;

// import io.swagger.v3.oas.models.media.MediaType;
import org.springframework.http.MediaType;

// Removed incorrect import of io.github.classgraph.Resource
import org.springframework.core.io.Resource;

@CrossOrigin(origins = "*") // Allow CORS for all origins
@RestController
public class FileUploadController {

    private static final String UPLOAD_DIR = "src/main/resources/uploads/";

    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    @PostMapping("/upload")
    public ResponseEntity<List<EvidenceDTO>> uploadFiles(@RequestParam("files") MultipartFile[] files,
            @RequestParam("selectionId") int selectionId) {
        System.out.println("Received selectionId: " + selectionId);
        List<EvidenceDTO> evidenceList = new ArrayList<>();
        selectionDetailsRepository.findById(selectionId)
                .orElseThrow(() -> new RuntimeException("SelectionDetails not found for id: " + selectionId));

        System.out.println("Number of files received: " + files.length);

        for (MultipartFile file : files) {
            // Validate file type
            String fileType = file.getContentType();
            if (fileType == null || (!fileType.equals("image/png") && !fileType.equals("image/jpeg")
                    && !fileType.equals("application/msword")
                    && !fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
                throw new IllegalArgumentException(
                        "Invalid file type. Only PNG, JPG, DOC, and DOCX files are allowed.");
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
                evidence.setSelectionId(selectionId);
                evidenceList.add(evidence);
                System.out.println("File uploaded successfully: " + file.getOriginalFilename() + evidence);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload files.");
            }
        }
        evidenceRepository.saveAll(evidenceList);
        return ResponseEntity.ok(evidenceList); // Return the list of EvidenceDTO objects
    }

    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {
        Path file = Paths.get(UPLOAD_DIR).resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = Files.probeContentType(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .body(resource);
    }
}
