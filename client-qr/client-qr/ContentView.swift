//
//  ContentView.swift
//  client-qr
//
//  Created by JAVIER CALATRAVA LLAVERIA on 29/3/25.
//

import SwiftUI

struct ContentView: View {
    @State private var scannedURL: String? = nil
    @State private var dataFromAPI: String? = nil
    @State private var showAlert = false
    @State private var alertMessage = ""

    var body: some View {
        VStack {
            if let scannedURL = scannedURL {
                Text("URL scanned: \(scannedURL)")
                    
                    .padding()

                Button("Do API Call") {
                    Task {
                        await fetchAPIData(from: scannedURL)
                    }
                }
                .padding()

                if let dataFromAPI = dataFromAPI {
                    Text("Data from API: \(dataFromAPI)")
                        .padding()
                }
            } else {
                ZStack {
                    
                    QRCodeScannerView {
                        self.scannedURL = $0
                    }
                    .edgesIgnoringSafeArea(.all)
                    Text("Scan QR code:")
                }

            }
        }
        .font(.title)
        .alert(isPresented: $showAlert) {
            Alert(title: Text("Error"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
        }
    }

    func fetchAPIData(from url: String) async {
        guard let url = URL(string: url) else { return }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            if let result = String(data: data, encoding: .utf8) {
                dataFromAPI = result
            }
        } catch {
            alertMessage = "Error: \(error.localizedDescription)"
            showAlert = true
        }
    }
}

#Preview {
    ContentView()
}
