package io.salesafari.tickets.services;

import io.salesafari.tickets.entities.Comment;
import io.salesafari.tickets.entities.Ticket;
import io.salesafari.tickets.repositories.CommentRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class TicketEventService {

    @Autowired
    private CommentRepository commentRepository;

    @Value("${nest.url}")
    private String remoteEndpointUrl;

    private String callRemoteEndpoint(String testValue) throws Exception {
        URL url = new URL(remoteEndpointUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String payload = String.format("{\"text\":\"%s\"}", testValue);

        OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
        writer.write(payload);
        writer.close();

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String inputLine;

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // Extract 'text' from JSON. Assuming a simple {"text": "some_value"} structure.
        String text = response.toString().split(":")[1];
        text = text.substring(1, text.length() - 2); // Remove quotes and closing brace.

        return text;
    }

    @SneakyThrows
    public void postTicketCreate(Ticket ticket) {
        String response = this.callRemoteEndpoint(ticket.getTest());
        Comment comment = new Comment();
        comment.setText(response);
        comment.setTicket(ticket);

        commentRepository.save(comment);
    }
}
