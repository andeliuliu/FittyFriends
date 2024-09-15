import UIKit
import UserNotifications
import Foundation

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Fetch the happy notification and use the response to trigger a local notification
        fetchHappyNotification(personality: "slay boss queen", task: "exercise", pet: "dog")
        fetchSadNotification(personality: "evil mobster", task: "exercise", pet: "dog")
    }
    
    func checkForPermission() {
        let notificationCenter = UNUserNotificationCenter.current()
        notificationCenter.getNotificationSettings { settings in
            switch settings.authorizationStatus {
            case .authorized:
                // Wait until we fetch the message before dispatching
                return
            case .denied:
                return
            case .notDetermined:
                notificationCenter.requestAuthorization(options: [.alert, .sound]) { didAllow, error in
                    if didAllow {
                        return
                    }
                }
            default:
                return
            }
        }
    }
    
    // Fetch the message from the server and trigger the notification
    func fetchHappyNotification(personality: String, task: String, pet: String) {
        let url = URL(string: "http://localhost:3005/happy-notification")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let requestBody: [String: Any] = [
            "personality": personality,
            "task": task,
            "pet": pet
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: requestBody)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Error: \(String(describing: error))")
                return
            }
            
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                if let responseJSON = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    if let notificationMessage = responseJSON["notification"] as? String {
                        print("Notification message: \(notificationMessage)")
                        
                        // Now trigger the local notification using the message from the server
                        DispatchQueue.main.async {
                            self.dispatchNotification(body: notificationMessage)
                        }
                    }
                }
            }
        }
            
        task.resume()
    }
    
    func fetchSadNotification(personality: String, task: String, pet: String) {
        let url = URL(string: "http://localhost:3005/sad-notification")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let requestBody: [String: Any] = [
            "personality": personality,
            "task": task,
            "pet": pet
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: requestBody)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Error: \(String(describing: error))")
                return
            }
            
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                if let responseJSON = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    if let notificationMessage = responseJSON["notification"] as? String {
                        print("Notification message: \(notificationMessage)")
                        
                        // Now trigger the local notification using the message from the server
                        DispatchQueue.main.async {
                            self.dispatchNotification(body: notificationMessage)
                        }
                    }
                }
            }
        }
            
        task.resume()
    }
    

    // Updated function to accept a custom message (from the server) for the notification body
    func dispatchNotification(body: String) {
        let identifier = "my-morning-notification"
        let title = "Bench Press Bobby"
                    
        let notificationCenter = UNUserNotificationCenter.current()
                    
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
                    
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false) // Sends notification after 1 second
        
        let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
        
        notificationCenter.removePendingNotificationRequests(withIdentifiers: [identifier])
        notificationCenter.add(request) { error in
            if let error = error {
                print("Error adding notification request: \(error)")
            }
        }
    }
}
